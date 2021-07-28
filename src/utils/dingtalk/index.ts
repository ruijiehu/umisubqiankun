import { message } from 'antd';
import { IS_DD, corpId } from '@/config';
import {
  checkEnv as ddCheckEnv,
  verificateJsApi as ddVerificateJsApi,
  login as ddLogin,
  chooseContact as ddChooseContact,
} from './dd';
import {
  checkEnv as zzdCheckEnv,
  verificateJsApi as zzdVerificateJsApi,
  login as zzdLogin,
  chooseContact as zzdChooseContact,
} from './zzd';

export const checkEnv = !IS_DD ? zzdCheckEnv : ddCheckEnv;

export const verificateJsApi = IS_DD
  ? ({ getTicket }: any) => {
      return ddVerificateJsApi({
        agentId: 355091730,
        corpId,
        jsApiList: [
          'biz.contact.complexPicker',
          'biz.contact.choose',
          'biz.contact.chooseMobileContacts',
          'biz.util.downloadFile',
        ],
        getTicket,
        prompt: message.error,
      });
    }
  : ({ getTicket }: any) => {
      return zzdVerificateJsApi({
        jsApiList: ['chooseContact', 'downloadFile', 'previewDoc'],
        getTicket,
        prompt: message.error,
      });
    };

export const login = IS_DD
  ? (
      getUserInfo: (
        authCode: string | void,
      ) => Promise<{ [key: string]: any; success: boolean; data: any }>,
    ) => {
      return ddLogin({
        corpId,
        getUserInfo,
        prompt: message.error,
      });
    }
  : (
      getUserInfo: (
        authCode: string | void,
      ) => Promise<{ [key: string]: any; success: boolean; data: any }>,
    ) => {
      return zzdLogin({
        corpId,
        getUserInfo,
        prompt: message.error,
      });
    };

export const chooseContact = IS_DD
  ? () => {
      return ddChooseContact({
        corpId,
        prompt: message.error,
      });
    }
  : () => {
      return zzdChooseContact({
        prompt: message.error,
      });
    };
