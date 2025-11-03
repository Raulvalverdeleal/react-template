export type BaseResponse<T = object> = Promise<
	| {
			result: 'nok';
			message: string;
	  }
	| ({
			result: 'ok';
			message: string;
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
