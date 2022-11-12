import { safeGetContainerDefinitions } from './container-definition.js';
import MarkdownItContainer from 'markdown-it-container';
export function MarkdownItNestedContainer(md, definitions) {
    const safeDefinitions = safeGetContainerDefinitions(definitions);
    safeDefinitions.forEach((definition) => {
        MarkdownItContainer(md, definition.containerName, definition.options);
    });
}
