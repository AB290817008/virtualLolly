const path = require(`path`);

exports.createPages = async ({ actions, graphql }) => {
    const { data } = await graphql(`
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
  `);

    console.log(data);
    data.LOLLIES.getAllLollies.forEach(({ lollyPath }) => {
        actions.createPage({
            path: `lollies/${lollyPath}`,
            component: path.resolve(`./src/components/dynamicLollyPage.tsx`),
            context: {
                lollyPath: lollyPath
            }
        });
    });
};
