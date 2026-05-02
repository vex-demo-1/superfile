import { visit } from "unist-util-visit";

/**
 * Converts remark-directive container nodes (:::tip,

:::caution,

:::note)
 * into <aside> elements that docs.css can style.
 */
export function remarkDirectivesHandler() {
	return tree => {
		visit(tree, node => {
			if (node.type === "containerDirective" || node.type === "leafDirective") {
				const name = node.name; // "tip" | "caution" | "note" | "danger"
				node.data = node.data ?? {};
				node.data.hName = "aside";
				node.data.hProperties = {
					...(node.attributes ?? {}),
					class: `doc-aside doc-aside--${name}`,
					"data-type": name
				};
			}
		});
	};
}
