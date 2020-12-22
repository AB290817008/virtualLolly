import React from 'react';
import Lolly from '../components/lolly';
import Header from '../components/header';
import { useQuery, gql } from '@apollo/client';

const GET_LOLLY_BY_PATH = gql`
	query getAllLollies($lollyPath: String!) {
		getAllLollies(lollyPath: $lollyPath) {
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
console.log('404', GET_LOLLY_BY_PATH);

export default function NotFound({ location }) {
	var queryLollies = location.pathname.slice(0, 9);
	var queryPath = location.pathname.slice(9);

	const { loading, error, data } = useQuery(GET_LOLLY_BY_PATH, {
		variables: { lollyPath: queryPath }
	});
	console.log('404Data=>', data);

	return (
		<div>
			{loading ? (
				<div className="loading">Loading...</div>
			) : !!data && queryLollies === '/lollies/' ? (
				<div>
					<Header
						mainHeadingText="Kuch Meetha Hojaye?"
						secondaryHeadingText="You recieved a lolly, dont eat it alone !"
					/>
					<h5 className="sharableLinkContainer">Your sharable link: </h5>{' '}
					<span className="sharableLink">
						{' '}
						{`https://kind-engelbart-84503d.netlify.app/lollies/${data.getAllLollies.lollyPath}`}
					</span>
					<div className="recievedContentContainer">
						<Lolly
							style="lollyRecieved"
							lollyTop={data.getAllLollies.flavorTop}
							lollyMid={data.getAllLollies.flavorMid}
							lollyBot={data.getAllLollies.flavorBot}
						/>

						<div className="recievedTextContainer">
							<h3>HI {data.getAllLollies.recipientName.toUpperCase()}</h3>
							<p>{data.getAllLollies.message}</p>
							<h4>From: {data.getAllLollies.sendersName}</h4>
						</div>
					</div>
				</div>
			) : (
				<div className="pageNotFound">404. Page not found.</div>
			)}
		</div>
	);
}
