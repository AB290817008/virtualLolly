import React from 'react';
import Header from '../components/header';
// import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';
import Lolly from '../components/lolly';
import './xyz.css';

const GET_QUERY = gql`
	{
		getAllLollies {
			recipientName
			sendersName
			message
			flavorTop
			flavorMid
			flavorBot
			lollyPath
		}
	}
`;
console.log('GETQUERY', GET_QUERY);

export default function xyz() {
	const { loading, error, data } = useQuery(GET_QUERY);
	if (loading) {
		return <p>Loading</p>;
	}
	if (error) {
		return <p>error</p>;
	}
	if (data) {
		console.log('xyzData', data.getAllLollies);
		console.log('xyzDataIndex', data.getAllLollies.lastIndexOf());
	}
    const arr = data.getAllLollies
    console.log("arr",arr);
    const index = arr.length - 1;
    console.log("index",index);
    
    
	return (
		<div>
			<Header mainHeadingText="Kuch Meetha Hojaye?" secondaryHeadingText="Aoo Khushiyaan Baantain..." />
			<div className="xyzLolly">
				<div>
					<Lolly />
				</div>
				<div>
                    <h2 className="xyzh2">To: {data.getAllLollies[index].recipientName}</h2>
                    <h2 className="xyzh2">Message: {data.getAllLollies[index].message}</h2>
                    <h2 className="xyzh2">From: {data.getAllLollies[index].sendersName}</h2>
                    <h2 className="xyzh2">Link: https://kind-engelbart-84503d.netlify.app/{data.getAllLollies[index].lollyPath}</h2>
				</div>
			</div>
		</div>
	);
}
