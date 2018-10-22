import { User } from '@dilta/models';
import gql from 'graphql-tag';

export const getUser = (id: string) => gql``;

export const findUsers = (query: Partial<User>) => gql``;

export const createUser = (query: Partial<User>) => gql``;

export const updateUser = (id: string, update: Partial<User>) => gql``;

export const deleteUser = (id: string) => gql``;
