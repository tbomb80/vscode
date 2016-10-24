/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

'use strict';

import * as nls from 'vs/nls';
import { Registry } from 'vs/platform/platform';
import { IWorkbenchContributionsRegistry, Extensions as WorkbenchExtensions } from 'vs/workbench/common/contributions';
import { ShowCurrentReleaseNotesAction, UpdateContribution } from 'vs/workbench/parts/update/electron-browser/update';
import { ReleaseNotesEditor } from 'vs/workbench/parts/update/electron-browser/releaseNotesEditor';
import { ReleaseNotesInput } from 'vs/workbench/parts/update/electron-browser/releaseNotesInput';
import { EditorDescriptor } from 'vs/workbench/browser/parts/editor/baseEditor';
import { IEditorRegistry, Extensions as EditorExtensions } from 'vs/workbench/common/editor';
import { SyncDescriptor } from 'vs/platform/instantiation/common/descriptors';
import { IWorkbenchActionRegistry, Extensions as ActionExtensions } from 'vs/workbench/common/actionRegistry';
import { SyncActionDescriptor } from 'vs/platform/actions/common/actions';

Registry.as<IWorkbenchContributionsRegistry>(WorkbenchExtensions.Workbench)
	.registerWorkbenchContribution(UpdateContribution);

// Editor
const editorDescriptor = new EditorDescriptor(
	ReleaseNotesEditor.ID,
	nls.localize('release notes', "Release notes"),
	'vs/workbench/parts/update/electron-browser/releaseNotesEditor',
	'ReleaseNotesEditor'
);

Registry.as<IEditorRegistry>(EditorExtensions.Editors)
	.registerEditor(editorDescriptor, [new SyncDescriptor(ReleaseNotesInput)]);

Registry.as<IWorkbenchActionRegistry>(ActionExtensions.WorkbenchActions)
	.registerWorkbenchAction(new SyncActionDescriptor(ShowCurrentReleaseNotesAction, ShowCurrentReleaseNotesAction.ID, ShowCurrentReleaseNotesAction.LABEL), 'Open Release Notes');
