import React, { useMemo, useState, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, message } from 'antd';
import { MonacoEditor, useMonaco } from '@roddan/ui';
import { useCurrent, useDesignEffect } from '@/hooks';

import { SettingItem } from '../setting-common';

const removeId = (id: string) => id?.replace(/\-(.*)?/, '');

const defaultCSS = (id: string) => {
  return {
    element: `/* 组件样式 */\n#${removeId(
      id,
    )}{\n\t\n} \n /* 容器样式 */\n#${removeId(id)?.replace(
      /^el/,
      'container',
    )}{\n\t\n}`,
    form: `#${removeId(id)}{\n\t\n}`,
  };
};

export const CustomCssSetting: React.FC<{ type: 'element' | 'form' }> =
  observer(({ type }) => {
    const [canSave, setCanSave] = useState(false);
    const isJsonValidate = useRef<boolean>(true);
    const tempVal = useRef('');
    const monaco = useMonaco();
    const { current, setProp } = useCurrent(type);
    const focus = useRef(false);

    useDesignEffect(() => {
      const keydonwFn = (e: KeyboardEvent) => {
        if (!focus.current) return;
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
          e.preventDefault();
          handleSave();
        }
      };
      document.addEventListener('keydown', keydonwFn);
      return () => {
        document.removeEventListener('keydown', keydonwFn);
      };
    });

    const value = useMemo(() => {
      setCanSave(false);
      if (!current.customCss) {
        return defaultCSS(current?.id as string)[type];
      }
      return current.customCss;
    }, [current.customCss, current?.id]);

    useDesignEffect(() => {
      if (!monaco) return;
      // console.log(monaco.languages);
      monaco.languages.css.cssDefaults.setDiagnosticsOptions({
        validate: true,
        lint: {
          emptyRules: 'ignore', // 忽略空规则校验
        },
      });
    }, [monaco]);

    const handleSave = () => {
      if (isJsonValidate.current) {
        setProp('customCss', tempVal.current);
        setCanSave(false);
        return;
      }
      message.error('格式不对');
    };

    return (
      <>
        <SettingItem
          tips="选择器是为了方便格式书写，并不存在于html中"
          label="自定义CSS"
        >
          <Button
            disabled={!canSave}
            onClick={handleSave}
            className="fe-attr-setting-btn"
            size="small"
            type="primary"
          >
            保存
          </Button>
        </SettingItem>
        <MonacoEditor
          style={{
            height:
              type === 'element' ? 'calc(100vh - 150px)' : 'calc(100% - 100px)',
          }}
          language="css"
          value={value}
          onChange={(v) => {
            setCanSave(true);
            tempVal.current = v as string;
          }}
          onValidate={(errors) => {
            isJsonValidate.current = errors.length === 0;
          }}
          options={{
            tabSize: 2,
          }}
          onFocus={() => {
            focus.current = true;
          }}
          onBlur={() => {
            focus.current = false;
          }}
        />
      </>
    );
  });
