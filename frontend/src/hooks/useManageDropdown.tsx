import { MoreVerticalIcon } from '../assets/icons/icons';
import DropDown from '../components/commons/Dropdown';
import { useNavigate } from '../lib/Router';
import colors from '../styles/colors';

function useManageDropdown(productId: string) {
  const navigate = useNavigate();

  const handleDelete = () => {
    navigate('/');
  };

  const handleModify = () => {
    navigate(`/post/manage?productId=${productId}`);
  };

  const productManageOptions = [
    {
      content: {
        text: '수정하기',
      },
      onClick: handleModify,
    },
    {
      content: {
        text: '삭제하기',
        style: { color: colors.red },
      },
      onClick: handleDelete,
    },
  ];

  const authorOnlyDropDown = (
    <DropDown
      initialDisplay={<MoreVerticalIcon />}
      dropDownElements={productManageOptions}
    />
  );

  return { authorOnlyDropDown };
}

export default useManageDropdown;
