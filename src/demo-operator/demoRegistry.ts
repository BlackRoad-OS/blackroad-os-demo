import { DemoAgent } from "./demoAgentContext";
import { EchoAgent } from "../agents/echoAgent";
import { CounterAgent } from "../agents/counterAgent";
import { DemoFinanceAgent } from "../agents/demoFinanceAgent";
import { ContradictionAgent } from "../agents/contradictionAgent";

export function createDemoAgents(): DemoAgent[] {
  return [new EchoAgent(), new CounterAgent(), new DemoFinanceAgent(), new ContradictionAgent()];
}
