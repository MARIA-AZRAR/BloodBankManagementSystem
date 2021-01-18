import React from 'react';
import styled from 'styled-components';


export default function Loading() {
  return (
    <span class="back">
		<span>L</span>
		<span>o</span>
		<span>a</span>
		<span>d</span>
		<span>i</span>
		<span>n</span>
		<span>g</span>
	</span>
  )
}



const LoadingContainer = styled.div`
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
  	html {
    	height:90%;
	}

	body {
		 background:#3F485B;
     display:flex;
     align-items:center;
     height:90%;
	}
	.back {
		margin:1em auto;
		font-family:"Roboto";
	}
	.back span {
		font-size:3em;
		color:#e02525;
		background:#262B37;
		display:table-cell;
		box-shadow:inset 0 0 5px rgba(0,0,0,0.3), 0 5px 0 #ccc;
		padding: 0 15px;
		line-height: 100px;
		animation:jumb 2s infinite;
	}
	@keyframes jumb {
		0% {
			transform:translateY(0px)
		}
		50% {
			transform:translateY(-30px);
			box-shadow:0 15px 0 #e02525;
		}
		100% {
			transform:translateY(0px)	
		}
	}
	.back span:nth-child(1) {
		animation-delay:0s;
	}
	.back span:nth-child(2) {
		animation-delay:.1s;	
	}
	.back span:nth-child(3) {
		animation-delay:.2s;
	}
	.back span:nth-child(4) {
		animation-delay:.3s;	
	}
	.back span:nth-child(5) {
		animation-delay:.4s;
	}
	.back span:nth-child(6) {
		animation-delay:.5s;	
	}
	.back span:nth-child(7) {
		animation-delay:.6s;
	}
`
