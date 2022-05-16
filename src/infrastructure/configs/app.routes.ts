
const usersRoot = '/users';
const configurationRoot = '/configuration';

const fileRoot = '/file';
export const routesV1 = {
  version: 'v1',
  user: {
    root: usersRoot,
    delete: `${usersRoot}/:id`,
  },
  configuration: {
    root: configurationRoot,
  },
  file:{
    root: fileRoot
  }
};
