import { ChatModelAdapter, ChatModelRunOptions, ChatModelRunResult} from "@assistant-ui/react";

export class DeepSeekChatModelAdapter implements ChatModelAdapter {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  run(_options: ChatModelRunOptions):
    | Promise<ChatModelRunResult>
    | AsyncGenerator<ChatModelRunResult, void> {
    // TODO: integrate with backend service
    throw new Error("Method not implemented.");
  }
}