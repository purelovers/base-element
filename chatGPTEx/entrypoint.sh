#!/bin/sh
cd ${WORKDIR}

# 自动更新
if [ "${AUTO_UPDATE}" = "true" ]; then
    if [ ! -s /tmp/requirements.txt.sha256sum ]; then
     