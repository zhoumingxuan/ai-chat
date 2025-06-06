import { ChatModelAdapter, ChatModelRunOptions, ChatModelRunResult} from "@assistant-ui/react";

class DeepSeekChatModelAdapter implements ChatModelAdapter
{
    run(options: ChatModelRunOptions): Promise<ChatModelRunResult> | AsyncGenerator<ChatModelRunResult, void> {
        throw new Error("Method not implemented.");
    }

}