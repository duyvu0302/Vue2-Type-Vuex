import i18n from './i18n';
import { extend, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

for (const [rule, validation] of Object.entries(rules)) {
    extend(rule, {
        ...validation,
    });
}

configure({
    defaultMessage: (field: string, values: any): any => {
        // override the field name.
        values._field_ = i18n.t(`fields.${field}`);
        return i18n.t(`validation.${values._rule_}`, values);
    },
});
