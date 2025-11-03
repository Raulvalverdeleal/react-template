import { usePreferences } from '@/hooks/use-preferences.ts';
import { Icon } from '@/components/ui/Icon.tsx';
import config from '@/config/index.json' with { type: 'json' };
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select.tsx';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { capitalize } from '@/utils/helpers.ts';

export function Header() {
	const preferences = usePreferences();
	function onSelect(lang: string) {
		preferences.setLang(lang);
	}

	useEffect(() => {
		document.body.classList.add('has-header');
		return () => document.body.classList.remove('has-header');
	}, []);

	return (
		<header className="inside-wrapper border-b">
			<div className="inside py-2">
				<div className="flex items-center justify-between w-full">
					<Link to={'/'}>
						<Icon name={'guidelines'} size={40} />
					</Link>
					<Select onValueChange={onSelect} value={preferences.lang}>
						<SelectTrigger className="w-[100px] cursor-pointer">
							<SelectValue placeholder={__('Language')} />
						</SelectTrigger>
						<SelectContent align="end">
							<SelectGroup>
								<SelectLabel>{__('Select a language')}</SelectLabel>
								{config.translations.supportedLanguages.map((language) => {
									return (
										<SelectItem key={language} value={language}>
											{capitalize(language)}
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
