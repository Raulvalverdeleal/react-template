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
export type SamplePayload = {
	foo: string;
};
export type SampleResponse = {
	bar: string;
};
// ---
