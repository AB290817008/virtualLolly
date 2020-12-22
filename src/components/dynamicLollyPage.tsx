import React from 'react';
import Lolly from './lolly';
import { graphql } from 'gatsby';
import Header from './header';
import { useQuery } from '@apollo/client';

// export const query = graphql`
//   query MyQuery($lollyPath: String!) {
//     LOLLIES {
//       getLollyByPath(lollyPath: $lollyPath) {
//         flavorBot
//         flavorMid
//         flavorTop
//         lollyPath
//         message
//         recipientName
//         sendersName
//       }
//     }
//   }
// `

const query = graphql`
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

export default function DynamicLollyPage({ data }) {
	return (
		<div>
			<Header
				mainHeadingText="Kuch Meetha Hojaye?"
				secondaryHeadingText="You recieved a lolly, dont eat it alone !"
			/>
			<h5 className="sharableLinkContainer">Your sharable link: </h5>{' '}
			<span className="sharableLink">
				{' '}
				{`https://elastic-booth-25fb65.netlify.app/lollies/${data.getAllLollies.lollyPath}`}
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
	);
}
