/**
 * type <EndpointName>Data = {...}
 * type <EndpointName>Response = {...}
 */

import { UserData } from '@types';

export type BaseResponse<T = object> = Promise<
	| {
			result: 'nok';
			message: string;
			aborted?: boolean;
	  }
	| ({
			result: 'ok';
			message: string;
			aborted?: boolean;
	  } & T)
>;
// ---
export type LoginPayload = {
	email: string;
	password: string;
};
export type LoginResponse = {
	data: UserData;
};
// ---
