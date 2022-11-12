import { ContainerDefinition, safeGetContainerDefinitions } from './container-definition.js';
import MarkdownIt from 'markdown-it';
import MarkdownItContainer from 'markdown-it-container';

export function MarkdownItNestedContainer(
    md: MarkdownIt, definitions?: ContainerDefinition[]
): void {
    const safeDefinitions = safeGetContainerDefinitions(definitions);
    safeDefinitions.forEach((definition) => {
        MarkdownItContainer(md, definition.containerName, definition.options);
    });
}



