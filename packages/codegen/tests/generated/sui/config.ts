/**************************************************************
 * THIS FILE IS GENERATED AND SHOULD NOT BE MANUALLY MODIFIED *
 **************************************************************/
import { bcs, type BcsType } from '@mysten/sui/bcs';
import * as object from './object.js';
export function Config() {
	return bcs.struct('Config', {
		id: object.UID(),
	});
}
export function Setting<Value extends BcsType<any>>(...typeParameters: [Value]) {
	return bcs.struct('Setting', {
		data: bcs.option(SettingData(typeParameters[0])),
	});
}
export function SettingData<Value extends BcsType<any>>(...typeParameters: [Value]) {
	return bcs.struct('SettingData', {
		newer_value_epoch: bcs.u64(),
		newer_value: bcs.option(typeParameters[0]),
		older_value_opt: bcs.option(typeParameters[0]),
	});
}
