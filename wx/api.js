import env from 'src/utils/env';
import Api from '../../configs/Api';

let Apis = {
    'DOMAIN' : env.DOMAIN,
    'CONTEXT' : env.API_ROOT
};

Object.assign(Apis, Api);

export default Apis;
