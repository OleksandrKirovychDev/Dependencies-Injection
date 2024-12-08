import { Logger } from './services/logger';

import type { User } from './types';
import { createIoCContainer } from './ioc';

const IoCContainer = createIoCContainer();

const renderUsers = async () => {
  const usersService = IoCContainer.resolve('users');
  const users = await usersService.getUsers();

  const listNode = document.getElementById('users-list');

  users.forEach((user: User) => {
    const listItemNode = document.createElement('li');

    listItemNode.innerHTML = user.name;
    listNode.appendChild(listItemNode);
  });
};

const app = () => {
  const config = (window as any).__CONFIG__;
  delete (window as any).__CONFIG__;
  IoCContainer.register('config', config.api);

  renderUsers();
};

window.onload = (event: Event) => {
  const logger = new Logger();

  logger.info('Page is loaded.');

  app();
};
