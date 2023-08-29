import React from 'react';
import DataMenu from '../../data';
import './menu.css';
import { DownOutlined, RightOutlined } from '@ant-design/icons';

export default function Menu() {
  const TreeItem = (props) => {
    const [show, setShow] = React.useState(false);
    const [show2, setShow2] = React.useState(false);
    return (
      <div id="TreeItem" key={props.id}>
        <div
          className="mainTitle-wrapper"
          onClick={() => {
            setShow((prev) => !prev);
          }}
          aria-hidden="true"
          role="button"
        >
          {props.title}
          {props.children &&
            (!show ? (
              <DownOutlined style={{ fontSize: '14px' }} />
            ) : (
              <RightOutlined style={{ fontSize: '14px' }} />
            ))}
        </div>
        <div className="treeChild-wrapper">
          {show &&
            props.children &&
            props.children.map((item, index) => (
              <div>
                <div
                  onClick={() => {
                    setShow2((prev) => !prev);
                  }}
                  key={index}
                  href={item.src}
                  className="treeChild-title"
                >
                  {item.title}
                  {item.children &&
                    (!show2 ? (
                      <DownOutlined style={{ fontSize: '14px' }} />
                    ) : (
                      <RightOutlined style={{ fontSize: '14px' }} />
                    ))}
                </div>
                {show2 && (
                  <div className="childTitle-wrapper">
                    {item.children &&
                      item.children.map((item, index) => {
                        return (
                          <div
                            onClick={() => {
                              setShow2((prev) => !prev);
                            }}
                            key={index}
                            href={item.src}
                            className="childTitle"
                          >
                            {item.title}
                          </div>
                        );
                      })}
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  };
  const parsedConfig = [...DataMenu];

  const formatter = (data) => {
    const sortedConfig = data.sort((a, b) => a.parentId - b.parentId);
    for (let index = sortedConfig.length - 1; index >= 0; index--) {
      if (sortedConfig[index].parentId) {
        const children = sortedConfig.splice(index, 1)[0];
        const parentIndex = sortedConfig.findIndex(
          (item) => item.id === children.parentId
        );
        const temp = sortedConfig[parentIndex].children;
        const temp2 = temp ? [...temp, children] : [children];
        sortedConfig[parentIndex] = {
          ...sortedConfig[parentIndex],
          children: temp2,
        };
      }
    }
    return sortedConfig;
  };

  const data = formatter(parsedConfig);
  return (
    <div className="menu-wrapper">
      {data.map((item) => (
        <TreeItem {...item} key={item.id} />
      ))}
    </div>
  );
}
