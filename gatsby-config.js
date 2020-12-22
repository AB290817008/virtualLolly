/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

// module.exports = {
//   /* Your site config here */
//   plugins: [],
// }

// module.exports = {
//   plugins: [
//     {
//       resolve: "gatsby-source-graphql",
//       options: {
//         // This type will contain remote schema Query type
//         typeName: "",
//         // This is the field under which it's accessible
//         fieldName: "",
//         // URL to query from
//         url: "http://localhost:8888/.netlify/functions/newLolly",
//       },
//     },

    
//   ],
// }

module.exports = {
  plugins: [
    {
      resolve: "gatsby-source-graphql",
      options: {
        // This type will contain remote schema Query type
        typeName: "Lolly",
        // This is the field under which it's accessible
        fieldName: "getAllLollies",
        // URL to query from
        url: "https://kind-engelbart-84503d.netlify.app/.netlify/functions/newLolly",
      },
    },

    
  ],
}