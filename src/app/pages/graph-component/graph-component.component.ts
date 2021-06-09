import { style } from "@angular/animations";
import { AfterViewInit, Component, ElementRef, ViewChild } from "@angular/core";
import {
  GraphComponent,
  GraphEditorInputMode,
  License,
  OrganicLayout,
  Point,
  Rect,
  ShapeNodeStyle,
} from "yfiles";
import licenseData from "../../../license.json";
import data from "../../../service/family.service.js";
License.value = licenseData;

@Component({
  selector: "app-graph-component",
  templateUrl: "./graph-component.component.html",
  styleUrls: ["./graph-component.component.css"],
})
export class GraphComponentComponent implements AfterViewInit {
  node: any;
  style: any;
  @ViewChild("graphComponentRef") graphComponentRef!: ElementRef;
  graphComponent!: GraphComponent;

  ngAfterViewInit() {
    console.log(data);
    this.graphComponent = new GraphComponent(
      this.graphComponentRef.nativeElement
    );
    this.graphComponent.inputMode = new GraphEditorInputMode();
    this.createSampleGraph(this.graphComponent.graph);
    this.graphComponent.fitGraphBounds();
    const layout = new OrganicLayout();
    layout.considerNodeSizes = true;
    layout.minimumNodeDistance = 70;

    // center the newly created graph
    this.graphComponent.fitGraphBounds();

    this.graphComponent.morphLayout(layout);
  }

  async createSampleGraph(graph) {
    const nodeRects = [];

    data.nodes.map(async (node) => {
      if (node.familyType === "MALE") {
        this.style = new ShapeNodeStyle({
          fill: "lightblue",
          shape: "rectangle",
          stroke: "1px solid blue",
        });
      } else {
        this.style = new ShapeNodeStyle({
          fill: "lightcoral",
          shape:'round-rectangle',
          stroke: "1px solid blue",
        });
      }
      const nodeRect = graph.createNodeAt(
        new Rect(
          node.id * 10,
          node.id * 10,
          node.layout.width,
          node.layout.height
        ),
        this.style
      );
      await nodeRects.push(nodeRect);
      graph.createEdge(nodeRects[0], nodeRects[10]);
      graph.createEdge(nodeRects[10], nodeRects[0]);
      graph.createEdge(nodeRects[0], nodeRects[1]);
      graph.createEdge(nodeRects[0], nodeRects[6]);
      graph.createEdge(nodeRects[0], nodeRects[11]);
      graph.createEdge(nodeRects[10], nodeRects[1]);
      graph.createEdge(nodeRects[10], nodeRects[6]);
      graph.createEdge(nodeRects[10], nodeRects[11]);
      graph.createEdge(nodeRects[12], nodeRects[13]);
      graph.createEdge(nodeRects[13], nodeRects[12]);
    

      graph.createEdge(nodeRects[6], nodeRects[11]);
      graph.createEdge(nodeRects[11], nodeRects[6]);

      graph.createEdge(nodeRects[11], nodeRects[12]);
      graph.createEdge(nodeRects[11], nodeRects[7]);

      graph.createEdge(nodeRects[6], nodeRects[12]);
      graph.createEdge(nodeRects[6], nodeRects[7]);
      graph.addLabel(nodeRect, node.labels[0].text);
    });
  }
}
//     // create some edges between the nodes
//     graph.createEdge(node1, node2);
//     graph.createEdge(node1, node3);
//     const edge = graph.createEdge(node2, node3);
//     // Creates the first bend for edge at (260, 30)
//     graph.addBend(edge, new Point(260, 30));
