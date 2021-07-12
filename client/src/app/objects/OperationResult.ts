export interface OperationResult<T> {
	status: number;
	isSuccess: boolean;
	data: T;
	message: string;
}
