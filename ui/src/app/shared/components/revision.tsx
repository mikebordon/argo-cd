import * as React from 'react';
import {revisionUrl} from './urls';

export const Revision = ({repoUrl, revision, path, isForPath, children}: {repoUrl: string; revision: string; path?: string; isForPath?: boolean; children?: React.ReactNode}) => {
    if (isForPath && !path) {
        // This source literally has no path, so we won't show one.
        return <span />;
    }
    revision = revision || '';
    const hasPath = path && path !== '.';
    let url = revisionUrl(repoUrl, revision, hasPath);
    if (url !== null && hasPath) {
        url += '/' + path;
    }
    const content = children || (isSHA(revision) ? (revision.startsWith('sha256:') ? revision.substr(0, 14) : revision.substr(0, 7)) : revision);
    return url !== null ? (
        <a href={url} target='_blank' rel='noopener noreferrer'>
            {content} <i className='fa fa-external-link-alt' />
        </a>
    ) : (
        <span>{content}</span>
    );
};

export const isSHA = (revision: string) => {
    if (revision.startsWith('sha256:')) {
        const hashOnly = revision.replace('sha256:', '');
        return hashOnly.match(/^[a-f0-9]{8,69}$/) !== null;
    }
    // https://stackoverflow.com/questions/468370/a-regex-to-match-a-sha1
    return revision.match(/^[a-f0-9]{5,40}$/) !== null;
};
