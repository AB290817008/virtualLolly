import React from 'react';
import Lolly from '../components/lolly';
import Header from '../components/header';
import { navigate } from 'gatsby';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/client';

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

export default function Home() {
	const { loading, error, data } = useQuery(GET_QUERY);
	if (loading) {
		return <p>Loading</p>;
	}
	if (error) {
		return <p>error</p>;
	}
	if (data) {
		console.log('indexData', data);
	}

	return (
		<div>
			<Header mainHeadingText="Is New Year Kuch Meetha Hojaye?" secondaryHeadingText="Send Happiness!" />
			<div className="lolliesContainer">
				<Lolly style="lollipop" />
				<Lolly style="lollipop" lollyTop="#6b6bde" lollyBot="#4ac383" lollyMid="#d2ec27" />
				<Lolly style="lollipop" lollyTop="#b71616" lollyBot="#bf10f1" lollyMid="#10adf1" />
				<Lolly style="lollipop" lollyTop="#ffc107" lollyBot="#00a97e" lollyMid="#ec398f" />
			</div>

			<button
				className="createLollyButton"
				onClick={() => {
					navigate('/createNew');
				}}
			>
				Send a customized lolly to a friend
			</button>
		</div>
	);
}
