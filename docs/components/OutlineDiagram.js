import React from "react";
import Diagram, {
  useSchema,
  createSchema,
  validateSchema,
} from "beautiful-react-diagrams";
import schema from "./outline_diagram.json";
import "beautiful-react-diagrams/styles.css";

validateSchema(schema);

const initialSchema = createSchema(schema);

export default function OutlineDiagram() {
  // create diagrams schema
  const [schema, {onChange}] = useSchema(initialSchema);

  return (
    <div style={{height: "16000px"}}>
      <Diagram schema={schema} onChange={onChange} />
    </div>
  );
}
