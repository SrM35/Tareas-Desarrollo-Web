type ListItemsProps = {
  children: React.ReactNode;
}

function ListItems({ children }: ListItemsProps) {
  return (
    <li>
      {children}
    </li>
  );
}

export default ListItems;