// figma.showUI(__html__);

figma.showUI(__html__, { width: 400, height: 600 });

figma.ui.onmessage = async (msg) => {
  if (msg.type === 'fetch-components') {
    const nodes = figma.currentPage.selection;
    const components: any[] = [];

    nodes.forEach((node) => {
      if (node.type === 'FRAME') {
        components.push(...node.children.map(child => ({
          name: child.name,
          type: child.type,
          characters: child.type === 'TEXT' ? (child as TextNode).characters : ''
        })));
      }
    });

    figma.ui.postMessage({ type: 'fetch-components', data: components });
  }
};


// figma.ui.onmessage = (msg: {type:string, page:string, topic: string, desc: string })=>{
//     if (msg.type === 'create'){

//         // const frame = figma.createRectangle();
//         // frame.name = msg.page
//         // frame.resize(1240,720)
//         // frame.fills = [{type: 'SOLID', color: {r:0.1, g: 1,b:0.2}}]
//         // figma.currentPage.selection= [frame];
//         // const textnode = figma.createText()
//         // textnode.characters = msg.topic
//         // textnode.x = 20 
//         // textnode.y = 20
//         // frame.appendChild(textnode)

//         const nodes: SceneNode[] = []
//         for (let i = 0 ; i < 2; i++){
//             const rect = figma.createRectangle()
//             rect.x = 120
//             rect.y = 1200 
//             rect.fills = [{type: 'SOLID', color: {r:0.1, g: 1, b:0.2}}]
//             figma.currentPage.appendChild(rect);
//             nodes.push(rect);
//         }
//         figma.currentPage.selection= nodes;
//         figma.viewport.scrollAndZoomIntoView(nodes);
//     }
//     figma.closePlugin();
// };