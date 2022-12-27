import { KeyboardEventHandler } from 'react'

import Image from 'next/image'

import { Burger, Group, TextInput } from '@mantine/core'

import styles from './styles.module.scss'

interface ISearch {
  onSearch: (keywords: string) => void
  onClear: () => void
  onKeyDown?: KeyboardEventHandler<HTMLInputElement>
}

const SearchBar = ({ onSearch, onClear, onKeyDown }: ISearch) => (
  <Group className={styles.searchBar} position="apart">
    <TextInput
      className={styles.searchInput}
      icon={<Image src="/assets/icons/search.svg" width={25} height={25} alt="search icon" />}
      placeholder="Search By Typing Keywords..."
      onChange={({ currentTarget: { value } }) => onSearch(value)}
      rightSection={<Burger opened={true} onClick={onClear} />}
      rightSectionWidth={50}
      size="xl"
      variant="filled"
      onKeyDown={onKeyDown}
    />
  </Group>
)

export default SearchBar
