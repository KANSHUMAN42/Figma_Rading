import { saveAs } from 'file-saver';
import { Document, Packer, Paragraph, TextRun } from 'docx';
window.onmessage = (event) => {
    const { type, data } = event.data.pluginMessage;
    if (type === 'fetch-components') {
        const componentsList = document.getElementById('components-list');
        componentsList.innerHTML = '';
        data.forEach((component) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `<h2>${component.name}</h2><p>Type: ${component.type}</p>${component.characters ? `<p>Text: ${component.characters}</p>` : ''}`;
            componentsList.appendChild(listItem);
        });
    }
};
document.getElementById('generate-document').onclick = () => {
    parent.postMessage({ pluginMessage: { type: 'fetch-components' } }, '*');
    const components = Array.from(document.getElementById('components-list').children);
    const doc = new Document();
    const paragraphs = components.map(component => {
        var _a;
        return new Paragraph({
            children: [
                new TextRun({ text: component.querySelector('h2').textContent, bold: true }),
                new TextRun({ text: `\n${component.querySelector('p:nth-of-type(1)').textContent}` }),
                new TextRun({ text: ((_a = component.querySelector('p:nth-of-type(2)')) === null || _a === void 0 ? void 0 : _a.textContent) ? `\n${component.querySelector('p:nth-of-type(2)').textContent}` : '' }),
            ],
        });
    });
    
    doc.addSection({
        children: paragraphs,
    });
    Packer.toBlob(doc).then(blob => {
        saveAs(blob, 'figma_components.docx');
    });
};
