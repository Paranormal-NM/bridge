import {Request, Response, NextFunction} from 'express';

// Interfaces (represent the DB model and types of the columns associated with a specific DB table)
import {Comment} from '../../utils/interfaces/Comment';
import {Status} from '../../utils/interfaces/Status';
import {Profile} from "../../utils/interfaces/Profile";
import {insertComment} from "../../utils/Comment/insertComment"
import {selectAllComments} from "../../utils/Comment/selectAllComments";
import {selectCommentsByCommentProfileId} from "../../utils/Comment/selectCommentByCommentProfileId";
import {selectCommentByCommentId} from '../../utils/Comment/selectCommentByCommentId';
import {deleteComment} from '../../utils/Comment/deleteComment'

export async function getAllCommentsController(request: Request, response: Response): Promise<Response<Status>> {

    try {
        const data = await selectAllComments()
        // return the response
        const status: Status = {status: 200, message: null, data};
        return response.json(status);
    } catch(error) {
        return response.json({
            status: 500,
            message: "",
            data: []
        })
    }
}

export async function getCommentByCommentProfileIdController(request : Request, response: Response, nextFunction: NextFunction): Promise<Response<Status>>{
    try {
        const     {commentProfileId} = request.params
        const data  = await selectCommentByCommentProfileId(commentProfileId)
        return response.json({status:200, message: null, data});
    } catch(error) {
        return response.json({
            status: 500,
            message: "",
            data: []
        })
    }
}

export async function getCommentByCommentIdController(request : Request, response: Response, nextFunction: NextFunction) : Promise<Response<Status>>{
    try {
        const     {commentId} = request.params
        const data  = await selectCommentByCommentId(commentId)
        return response.json({status:200, message: null, data});
    } catch(error) {
        return response.json({
            status: 500,
            message: "",
            data: null
        })
    }
}

export async function postComment(request: Request, response: Response) : Promise<Response<Status>> {
    try {

        const {commentBody} = request.body;
        const profile : Profile = request.session.profile as Profile
        const commentProfileId : string = <string>profile.profileId

        const comment: Comment = {
            commentId: null,
            commentProfileId,
            commentBody,
            commentTitle
        }
        const result = await insertComment(comment)
        const status: Status = {
            status: 200,
            message: result,
            data: null
        };
        return response.json(status);

    } catch(error) {
        return  response.json({
            status: 500,
            message: "Error Creating comment try again later.",
            data: null
        });
    }
}



export async function deleteComment(request: Request, response: Response) {
	try {
		const {commentId} = request.body;
		const result = await deleteComment(commentId)
		const status: Status = {status: 200, data, message: null}
		return response.json(status)
	} catch (error) {
		console.log(error)
	}
}