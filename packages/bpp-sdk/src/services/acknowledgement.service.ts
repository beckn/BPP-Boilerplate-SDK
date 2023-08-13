export class AcknowledgementService {
  getAck() {
    return {
      message: {
        ack: {
          status: 'ACK'
        }
      }
    }
  }
}
