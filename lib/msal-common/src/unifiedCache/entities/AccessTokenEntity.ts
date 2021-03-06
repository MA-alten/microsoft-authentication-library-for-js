/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License.
 */

import { Credential } from "./Credential";
import { CredentialType } from "../../utils/Constants";

/**
 * ACCESS_TOKEN Credential Type
 */
export class AccessTokenEntity extends Credential {
    realm: string;
    target: string;
    cachedAt: string;
    expiresOn: string;
    extendedExpiresOn?: string;
    refreshOn?: string;
    keyId?: string; // for POP and SSH tokenTypes
    tokenType?: string;

    /**
     * Create AccessTokenEntity
    */
    static createAccessTokenEntity(
        homeAccountId: string,
        environment: string,
        accessToken: string,
        clientId: string,
        tenantId: string,
        scopes: string,
        expiresOn: number,
        extExpiresOn: number
    ): AccessTokenEntity {
        const atEntity: AccessTokenEntity = new AccessTokenEntity();

        atEntity.homeAccountId = homeAccountId;
        atEntity.credentialType = CredentialType.ACCESS_TOKEN;
        atEntity.secret = accessToken;

        const date = new Date();
        const currentTime = date.getMilliseconds() / 1000;
        atEntity.cachedAt = currentTime.toString();

        // TODO: Crosscheck the exact conversion UTC
        // Token expiry time.
        // This value should be  calculated based on the current UTC time measured locally and the value  expires_in Represented as a string in JSON.
        atEntity.expiresOn = expiresOn.toString();
        atEntity.extendedExpiresOn = extExpiresOn.toString();

        atEntity.environment = environment;
        atEntity.clientId = clientId;
        atEntity.realm = tenantId;
        atEntity.target = scopes;

        return atEntity;
    }
}
