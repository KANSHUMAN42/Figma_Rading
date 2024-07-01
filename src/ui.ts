import  {saveAs} from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';

window.onmessage = (event) => {
  const { type, data } = event.data.pluginMessage;

  if (type === 'fetch-components') {
    const componentsList = document.getElementById('components-list');
    if (!componentsList) return; // Check if element exists

    componentsList.innerHTML = '';

    data.forEach((component: any) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = `<h2>${component.name}</h2><p>Type: ${component.type}</p>${component.characters ? `<p>Text: ${component.characters}</p>` : ''}`;
      componentsList.appendChild(listItem);
    });
  }
};

document.getElementById('generate-document')!.onclick = () => {
  parent.postMessage({ pluginMessage: { type: 'fetch-components' } }, '*');

  const componentsList = document.getElementById('components-list');
  if (!componentsList) return; // Check if element exists

  const components = Array.from(componentsList.children);
  const doc = new Document({
    sections: [
      {
        properties: {},
        children: components.map(component =>
          new Paragraph({
            children: [
              new TextRun({ text: component.querySelector('h2')!.textContent!, bold: true }),
              new TextRun({ text: `\n${component.querySelector('p:nth-of-type(1)')!.textContent}` }),
              new TextRun({ text: component.querySelector('p:nth-of-type(2)')?.textContent ? `\n${component.querySelector('p:nth-of-type(2)')!.textContent}` : '' }),
            ],
          })
        )
      }
    ]
  });

  Packer.toBlob(doc).then(blob => {
    saveAs(blob, 'figma_components.docx');
  });
};
