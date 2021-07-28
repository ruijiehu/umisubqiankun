import useUser from '@/hooks/user';
export default () => {
  const { userInfo } = useUser();
  return <div>{userInfo.aliasName}</div>;
};
