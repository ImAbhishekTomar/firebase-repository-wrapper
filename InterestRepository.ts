import { BaseRepository } from './base/baseRepository';
import { Interest } from '../entity/Interest';

export class InterestRepository extends BaseRepository<Interest> {
	onDocumentChange = (
		document: string,
		callbackSuccess: (currentData: firebase.firestore.DocumentData, source?: string | 'Local' | 'Server') => void,
		callbackError?: (e: Error) => void,
		callbackCompletion?: () => void
	) => {
		this._db.collection(this._collectionName).doc(document).onSnapshot(
			{
				// Listen for document metadata changes
				includeMetadataChanges: true
			},
			(doc) => {
				const source = doc.metadata.hasPendingWrites ? 'Local' : 'Server';
				callbackSuccess(doc.data(), source);
			},
			(error) => callbackError(error),
			() => callbackCompletion()
		);
	};
}
