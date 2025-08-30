import { config } from '@utils';
import { useTranslator, usePreferences } from '@hooks';
import {
	Icon,
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@components';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export function Header() {
	const preferences = usePreferences();
	const __ = useTranslator();
	function onSelect(lang: string) {
		preferences.setLang(lang);
	}

	useEffect(() => {
		document.body.classList.add('has-header');
		return () => document.body.classList.remove('has-header');
	}, []);

	return (
		<header className="inside-wrapper border-b">
			<div className="inside !py-2">
				<div className="flex items-center justify-between w-full">
					<Link to={'/'}>
						<Icon name={'guidelines'} size={40} />
					</Link>
					<Select onValueChange={onSelect} value={preferences.lang}>
						<SelectTrigger className="w-[80px] cursor-pointer">
							<SelectValue placeholder={__('Language')} />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								<SelectLabel>{__('Select a language')}</SelectLabel>
								{config.supportedLanguages.map((language, index) => {
									return (
										<SelectItem key={index} value={language}>
											{language}
										</SelectItem>
									);
								})}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
		</header>
	);
}
