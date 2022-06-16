import { AsyncThunk } from '@reduxjs/toolkit';

export type GenericAsynkThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsynkThunk['pending']>;
export type FulfilledAction = ReturnType<GenericAsynkThunk['fulfilled']>;
export type RejectedAction = ReturnType<GenericAsynkThunk['rejected']>;
