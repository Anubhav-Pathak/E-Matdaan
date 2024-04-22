"use client";

import * as d3 from 'd3';
import { useEffect } from 'react';

export default function Barplot({election}) {

    let data = [];
    election.candidates.map(candidate => {
        let total_votes = election.votes.filter(vote => vote.candidateID === candidate.id).length
        data.push({name: candidate.name, votes: total_votes});
    });

    function createBarChart(data) {
        const svg = d3.select("svg"),
        margin = { top: 20, right: 20, bottom: 30, left: 40 },
        width = svg.attr("width") - margin.left - margin.right,
        height = svg.attr("height") - margin.top - margin.bottom;

        svg.selectAll("*").remove();

        const x = d3.scaleBand().range([0, width]).padding(0.1);
        const y = d3.scaleLinear().range([height, 0]);

        x.domain(data.map(d => d.name));
        y.domain([0, d3.max(data, d => d.votes)]);

        const g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        g.append("g").attr("class", "axis axis--x").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x));
        g.append("g").attr("class", "axis axis--y").call(d3.axisLeft(y).ticks(10, "s"));

        const color = d3.scaleOrdinal(d3.schemeCategory10);
        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", d => x(d.name))
            .attr("y", d => y(d.votes))
            .attr("width", x.bandwidth())
            .attr("height", d => height - y(d.votes))
            .attr("fill", (d, i) => color(i));
    }

    useEffect(()=>{
        createBarChart(data);
    }, []);

  return (
    <div className='bg-neutral'>
      <svg id='svg' width="600" height="400"></svg>
    </div>
  );
}
