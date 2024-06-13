export interface IMessage {
  content: string;
  senderAdmin?: {
    id: number;
  };
  senderClient?: {
    id: number;
  };
  receiverClient: {
    code: string;
  };
}
