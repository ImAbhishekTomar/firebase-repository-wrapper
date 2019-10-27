import * as firebase from 'firebase';
export interface IWrite<T> {
	addCollection(item: T): Promise<firebase.firestore.DocumentReference>;
	addDocument(documentName: string, item: T): Promise<void>;
	// create(item: T): Promise<boolean>;
	update(id: string, item: T): Promise<boolean>;
	delete(id: string): Promise<boolean>;
}
