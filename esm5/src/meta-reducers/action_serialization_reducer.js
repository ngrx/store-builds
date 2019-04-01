import { getUnserializable, throwIfUnserializable } from './utils';
export function actionSerializationCheckMetaReducer(reducer) {
    return function (state, action) {
        var unserializable = getUnserializable(action);
        throwIfUnserializable(unserializable, 'action');
        return reducer(state, action);
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aW9uX3NlcmlhbGl6YXRpb25fcmVkdWNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL21vZHVsZXMvc3RvcmUvc3JjL21ldGEtcmVkdWNlcnMvYWN0aW9uX3NlcmlhbGl6YXRpb25fcmVkdWNlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFDQSxPQUFPLEVBQUUsaUJBQWlCLEVBQUUscUJBQXFCLEVBQUUsTUFBTSxTQUFTLENBQUM7QUFFbkUsTUFBTSxVQUFVLG1DQUFtQyxDQUNqRCxPQUFnQztJQUVoQyxPQUFPLFVBQVMsS0FBSyxFQUFFLE1BQU07UUFDM0IsSUFBTSxjQUFjLEdBQUcsaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDakQscUJBQXFCLENBQUMsY0FBYyxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBRWhELE9BQU8sT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQztJQUNoQyxDQUFDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWN0aW9uUmVkdWNlciB9IGZyb20gJy4uL21vZGVscyc7XG5pbXBvcnQgeyBnZXRVbnNlcmlhbGl6YWJsZSwgdGhyb3dJZlVuc2VyaWFsaXphYmxlIH0gZnJvbSAnLi91dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBhY3Rpb25TZXJpYWxpemF0aW9uQ2hlY2tNZXRhUmVkdWNlcihcbiAgcmVkdWNlcjogQWN0aW9uUmVkdWNlcjxhbnksIGFueT5cbik6IEFjdGlvblJlZHVjZXI8YW55LCBhbnk+IHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHN0YXRlLCBhY3Rpb24pIHtcbiAgICBjb25zdCB1bnNlcmlhbGl6YWJsZSA9IGdldFVuc2VyaWFsaXphYmxlKGFjdGlvbik7XG4gICAgdGhyb3dJZlVuc2VyaWFsaXphYmxlKHVuc2VyaWFsaXphYmxlLCAnYWN0aW9uJyk7XG5cbiAgICByZXR1cm4gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgfTtcbn1cbiJdfQ==