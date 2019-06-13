// ====================================================================
// XEP-0048: Bookmarks
// --------------------------------------------------------------------
// Source: https://xmpp.org/extensions/xep-0048.html
// Version: 1.1 (2007-11-07)
// ====================================================================

import { attribute, childText, DefinitionOptions } from '../jxt';

import { PubsubItemContent } from './';
import { NS_BOOKMARKS } from './Namespaces';
import { JID, JIDAttribute, pubsubItemContentAliases } from './util';

declare module './' {
    export interface PrivateStorage {
        bookmarks?: BookmarkStorage;
    }
}

export interface BookmarkStorage extends PubsubItemContent {
    itemType?: typeof NS_BOOKMARKS;
    rooms?: MUCBookmark[];
}

export interface MUCBookmark {
    jid: JID;
    name?: string;
    nick?: string;
    autoJoin?: boolean;
    password?: string;
}

export default [
    {
        aliases: [
            { path: 'bookmarkStorage', impliedType: true },
            { path: 'iq.privateStorage.bookmarks', impliedType: true },
            ...pubsubItemContentAliases()
        ],
        element: 'storage',
        namespace: NS_BOOKMARKS,
        type: NS_BOOKMARKS,
        typeField: 'itemType'
    },
    {
        aliases: [{ path: 'bookmarkStorage.conferences', multiple: true }],
        element: 'conference',
        fields: {
            autoJoin: attribute('autojoin'),
            jid: JIDAttribute('jid'),
            name: attribute('name'),
            nick: childText(null, 'nick'),
            password: childText(null, 'password')
        },
        namespace: NS_BOOKMARKS
    }
] as DefinitionOptions[];