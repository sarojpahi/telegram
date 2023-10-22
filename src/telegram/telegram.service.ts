import { Injectable, Logger } from '@nestjs/common';
import TelegramBot = require('node-telegram-bot-api');
import { Observable, fromEvent } from 'rxjs';
import { EventEmitter } from 'events'; // Import EventEmitter from the 'events' module

const token = '6902024457:AAGC73vm-Ws75G8c1Cr4Pq7TjLuasrlpIBE';

@Injectable()
export class TelegramService {
  private readonly bot: TelegramBot;
  private logger = new Logger(TelegramService.name);

  // Create an EventEmitter for message events
  private readonly messageReceived = new EventEmitter();

  constructor() {
    this.bot = new TelegramBot(token, { polling: true });

    this.bot.on('polling_error', (error) => {
      this.logger.error('Polling error:', error.message);
    });

    this.bot.on('message', (msg) => {
      this.receiveMessage(msg);
    });
  }

  async sendMessage(chatId: number, message: string, options?: any) {
    if (options) {
      await this.bot.sendMessage(chatId, message, options);
    } else {
      await this.bot.sendMessage(chatId, message);
    }
  }

  receiveMessage(msg) {
    // Emit the messageReceived event with the message
    this.messageReceived.emit('message', {
      text: msg.text,
      chatId: msg.chat.id,
    });
  }

  // Expose messageReceived as an Observable
  public getMessageReceivedObservable(): Observable<any> {
    return fromEvent(this.messageReceived, 'message');
  }
}
