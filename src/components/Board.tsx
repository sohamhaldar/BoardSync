'use client';
import React,{useCallback, useEffect, useState} from 'react';
import { Tldraw, useEditor, HistoryEntry, TLRecord, Editor} from 'tldraw'
import 'tldraw/tldraw.css'

function Board({socket,workspaceId,username}:{
  socket:any
  workspaceId:string
  username:string|undefined
}) {
  return (
    <Tldraw className='rounded-lg z-0'>
      <EditorControl socket={socket} username={username} workspaceId={workspaceId}/>
    </Tldraw>
  )
}

function EditorControl({socket,username,workspaceId}:{
  socket:any
  username:string|undefined
  workspaceId:string
}){
  const editor=useEditor();
  useEffect(() => {
		socket.on('board-changes', (data: any) => {
      if (editor && data && data.data) {
        let snapshot = editor.store.getSnapshot();
        // console.log('first', snapshot);
        if (snapshot&& snapshot.store) {
          for (const key in data.data) {
            if (key.startsWith("shape:")) {
              let shape = data.data[key];
              if (shape) {
                if (!shape.meta) shape.meta = {};
                if (!shape.meta.user) {
                  shape.meta.user = data.owner;
                }
                if (shape.meta.user) {
                  shape.isLocked = (shape.meta.user == username) ? false : true;
                  data.data[key] = shape;
                }
              }
            }
          }
          snapshot.store = data.data;
          editor.store.loadSnapshot(snapshot);
        }
      }
    });
    socket.emit('get-board',{
      workspaceId,
      owner: username
    })
    socket.on('get-board', (data: any) => {
      if (data && data.board && editor) {
        let snapshot = editor.store.getSnapshot();
        // console.log('first', snapshot);
        if (snapshot && snapshot.store) {
          for (const key in data.board.data) {
            if (key.startsWith("shape:")) {
              let shape = data.board.data[key];
              if (shape) {
                if (!shape.meta) shape.meta = {};
                if (!shape.meta.user) {
                  shape.meta.user = data.board.owner;
                }
                if (shape.meta.user) {
                  shape.isLocked = (shape.meta.user == username) ? false : true;
                  data.board.data[key] = shape;
                }
              }
            }
          }
          snapshot.store = data.board.data;
          editor.store.loadSnapshot(snapshot);
        }
      }
    });
    
    return ()=>{
      socket.off('board-changes');
      socket.off('get-board');
    }
	  }, [editor,socket]);
    useEffect(() => {
			if(editor){
				editor.on('update',()=>{
						// console.log('doing');
					const modified=editor.store.getSnapshot();
					console.log(modified);
          socket.emit('board-changes',{data:modified.store,owner:username,workspaceId});
				});
			}
	  },[editor,socket])

  return null;
}

export default Board