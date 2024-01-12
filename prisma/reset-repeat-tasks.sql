/*
    This Event resets all tasks in the Task table if their
    repeat and complete fields are set to true. All of those tasks
    will update:
        - completed = false;
        - due_date = currdate()
*/

DELIMITER //

CREATE EVENT reset_completed_tasks
ON SCHEDULE EVERY 1 DAY
STARTS CURRENT_TIMESTAMP
COMMENT 'Reset completed tasks every day at midnight'
DO
BEGIN
    UPDATE task
    SET completed = 0, due_date = DATE_ADD(CURDATE(), INTERVAL 1 DAY)
    WHERE completed = 1 AND repeat_task = 1;
END//

DELIMITER ;